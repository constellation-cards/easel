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
          ghostscript
          graphicsmagick
          nodejs_22
          parallel
          texliveConTeXt
        ];
      in
      {
        packages.default = pkgs.buildNpmPackage {
          name = "constellation-cards-easel";
          nativeBuildInputs = easeldeps;
          src = self;
          npmDepsHash = "sha256-uUtK10SwZvSU3x7z9pyPcPMFinjaLq6DMaJegkXy/Uo=";
          npmBuildScript = "testbuild";
          installPhase = ''
            mkdir $out
            npm run out-json $out/cards.json
            npm run out-tex $out/cards.json cards.tex
            npm run out-csv $out/cards.json $out/cards.csv
            context cards.tex --purgeall
            cp -r out/* $out/
            cp cards.pdf $out/
          '';
        };
        devShell = pkgs.mkShell {
          name = "easel";
          packages = easeldeps;
        };
      }
    );
}
