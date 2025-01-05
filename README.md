# Easel

"Easel" is a project supporting the TTRPG [Constellation Cards](https://constellation.cards/). It uses [Nix](https://nixos.org) to perform a multi-stage build of the following pieces:

* A [Next.js](https://nextjs.org) static website
* A PDF of cards built with [ConTeXt](https://wiki.contextgarden.net)
* Images suitable for import into [Tabletop Simulator](https://www.tabletopsimulator.com/), via [ImageMagick](https://imagemagick.org/)

Github Actions perform the build, then deploy the site to [Netlify](https://www.netlify.com/).

## Development

You are encouraged to have the Nix package manager installed, although it's optional if you're only building the Next.js site.

This project uses a Nix Flake, allowing you to run `nix develop` to be dropped into a shell with all the relevant prerequisites installed.

You can run `nix build` to build the entire website.

You can also use the following commands which don't require Nix:

* `npm run dev` to run the Next.js website in developer mode, with hot module reloading enabled
* `npm build` to build a static version of the site
* `npm test` to validate the raw card data, e.g. to test that every card has a unique name

## CI/CD

Github Actions and Netlify are setup such that:

* Pushes to the `main` branch deploy to the website at https://constellation.cards/
* Pushes to any other branch do not deploy anything
* Pull Requests in Github will create a preview site, whose URL is added as a comment to the PR

URLs for a Pull Request are based on the PR number, so repeated updates to the PR will be visible at the same URL.

The intended flow is that you do ordinary work in a branch, then open a PR once you're ready to share your work.
Once you're satisfied, merge the PR into `main` to deploy it.

## Future Plans

At one point there was a `@constellation-cards/cards` NPM package, so that multiple online tools could use the card data.

This approach is deprecated. Instead, there's a [cards.json](https://constellation.cards/cards.json) file that contains all the card data,
allowing non-JavaScript projects to consume it.