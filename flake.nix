{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        packages.default = pkgs.buildNpmPackage {
          name = "constellation-cards-easel";
          buildInputs = with pkgs; [
            nodejs_22
          ];
          src = self;
          npmDepsHash = "sha256-rCr7RCtwe2M1Gx9N9wFG1IWrY+T00xpb8Oj0U707MQQ=";
          installPhase = ''
            mkdir $out
            cp -r out/* $out/
            echo "Did it" > $out/did-it
          '';
        };
        devShell = pkgs.mkShell {
          name = "easel";
          packages = with pkgs; [
            nodejs_22
          ];
        };
      }
    );
}
