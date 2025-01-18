set -xeuo pipefail
npm run out-tex result/cards.json cards.tex      # Generate ConTeXt input
export OSFONTDIR=$PWD/fonts                    # Set up font config for ConTeXt
mtxrun --generate
mtxrun --script fonts --reload
context cards.tex --purgeall                   # Generate PDF
