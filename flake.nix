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
          npmDepsHash = "sha256-w5jPeg4NaHIziaY18k1HMYPPLd7xLC9/MJcJ4ERCMWE=";
          installPhase = ''
            mkdir $out
            cp -r out/* $out/
            cp node_modules/@constellation-cards/cards/cards.json $out/
            node out-tex.js
            context cards.tex --purgeall
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
