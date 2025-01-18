{
  description = "Easel, the Constellation Cards official website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        easeldeps = with pkgs; [
          nodejs_22
          parallel
          texliveConTeXt
          ghostscript
          graphicsmagick
          imagemagick
          inkscape
        ];
      in
      {
        packages.nodemodules = pkgs.buildNpmPackage {
          name = "constellation-cards-easel-nodemodules";
          nativeBuildInputs = with pkgs; [ nodejs_22 ];
          src = nixpkgs.lib.sources.sourceByRegex self ["^package(|-lock)\.json$"];
          npmDepsHash = "sha256-NHIVSIUSZjbBQQa+cB/XRgFUDbCybKNVKpE5AhsXcjE=";
          npmBuildScript = "true";
          installPhase = ''
            mkdir $out
            cp -a node_modules/. $out/
          '';
        };
        packages.nextjs = pkgs.stdenv.mkDerivation {
          name = "constellation-cards-easel-nodemodules";
          nativeBuildInputs = easeldeps ++ [ self.packages.${system}.nodemodules ];
          src = self;
          buildPhase = ''
            cp -a ${self.packages.${system}.nodemodules}/. node_modules/
            ls -la
            npm run testbuild
          '';
          installPhase = ''
            mkdir $out
            cp -r out/* $out/
          '';
        };
        packages.json = pkgs.stdenv.mkDerivation {
          name = "constellation-cards-easel-json";
          nativeBuildInputs = easeldeps ++ [ self.packages.${system}.nodemodules ];
          src = self;
          buildPhase = ''
            cp -a ${self.packages.${system}.nodemodules}/. node_modules/
            npm run out-json cards.json
          '';
          installPhase = ''
            mkdir $out
            cp cards.json $out/
          '';
        };
        packages.pdf = pkgs.stdenv.mkDerivation {
          name = "constellation-cards-easel-pdf";
          nativeBuildInputs = easeldeps ++ [ self.packages.${system}.nodemodules self.packages.${system}.json ];
          src = self;
          buildPhase = ''
            cp -a ${self.packages.${system}.nodemodules}/. node_modules/
            npm run out-tex ${self.packages.${system}.json}/cards.json cards.tex
            export OSFONTDIR=$PWD/fonts
            mtxrun --generate
            mtxrun --script fonts --reload
            context cards.tex --purgeall
          '';
          installPhase = ''
            mkdir $out
            cp cards.pdf $out/
          '';
        };
        packages.csv = pkgs.stdenv.mkDerivation {
          name = "constellation-cards-easel-csv";
          nativeBuildInputs = easeldeps ++ [ self.packages.${system}.nodemodules self.packages.${system}.json ];
          src = self;
          buildPhase = ''
            cp -a ${self.packages.${system}.nodemodules}/. node_modules/
            npm run out-csv ${self.packages.${system}.json}/cards.json cards.csv
          '';
          installPhase = ''
            mkdir $out
            cp cards.csv $out/
          '';
        };
        packages.default = pkgs.buildNpmPackage {
          name = "constellation-cards-easel";
          nativeBuildInputs = easeldeps;
          src = self;
          npmDepsHash = "sha256-NHIVSIUSZjbBQQa+cB/XRgFUDbCybKNVKpE5AhsXcjE=";
          npmBuildScript = "testbuild";
          installPhase = ''
            mkdir $out
            cp -r out/* $out/
            npm run out-json $out/cards.json               # Generate JSON
            npm run out-csv $out/cards.json $out/cards.csv # Generate CSV
            npm run out-tex $out/cards.json cards.tex      # Generate ConTeXt input
            export OSFONTDIR=$PWD/fonts                    # Set up font config for ConTeXt
            mtxrun --generate
            mtxrun --script fonts --reload
            context cards.tex --purgeall                   # Generate PDF
            cp cards.pdf $out/
            bash tabletop-simulator.sh
            cp montage-*.png $out/
          '';
        };
        devShell = pkgs.mkShell {
          name = "easel";
          packages = easeldeps;
        };
      }
    );
}
