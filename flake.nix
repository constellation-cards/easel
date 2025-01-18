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
          src = self;
          npmDepsHash = "sha256-NHIVSIUSZjbBQQa+cB/XRgFUDbCybKNVKpE5AhsXcjE=";
          npmBuildScript = "true";
          installPhase = ''
            mkdir $out
            cp -r node_modules/* $out/
          '';
        };
        packages.nextjs = pkgs.stdenv.mkDerivation {
          name = "constellation-cards-easel-nodemodules";
          nativeBuildInputs = easeldeps ++ [ self.packages.${system}.nodemodules ];
          src = self;
          buildPhase = ''
            ln -s ${self.packages.${system}.nodemodules} node_modules
            npm run testbuild
          '';
          installPhase = ''
            mkdir $out
            cp -r out/* $out/
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
