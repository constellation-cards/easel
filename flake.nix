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
          buildInputs = easeldeps;
          src = self;
          npmDepsHash = "sha256-rCr7RCtwe2M1Gx9N9wFG1IWrY+T00xpb8Oj0U707MQQ=";
          installPhase = ''
            mkdir $out
            cp -r out/* $out/
            cp node_modules/@constellation-cards/cards/cards.json $out/
          '';
        };
        devShell = pkgs.mkShell {
          name = "easel";
          packages = easeldeps;
        };
      }
    );
}
