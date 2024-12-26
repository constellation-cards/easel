set -x

# This script must be run in a `nix develop` shell

# Ensure working directories exist
[ -d card-images ] && rm -rfv card-images
[ -d card-images-front ] && rm -rfv card-images-front
[ -d card-images-back ] && rm -rfv card-images-back
mkdir card-images card-images-back card-images-front

[ -f result/cards.pdf ] || { echo "Please build easel first"; exit 1; }

magick -density 300 result/cards.pdf -background white -alpha remove -alpha off card-images/cards-%03d.png
cp card-images/cards-*[24680].png card-images-back/
cp card-images/cards-*[13579].png card-images-front/

parallel -N50 montage -geometry +0+0 -tile 10x {} montage-back-{#}.png ::: card-images-back/*
parallel -N50 montage -geometry +0+0 -tile 10x {} montage-front-{#}.png ::: card-images-front/*
