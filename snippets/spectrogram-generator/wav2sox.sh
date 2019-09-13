echo "ENTER A VERSION TO PARSE: 'i.e. v2'"
read ver
echo "Starting to Parse /midi_$ver"
echo "GENERATING SONOGRAMS"
echo "CREATING CSV"

for dir in $(pwd)/midi_$ver/input/*
do
    basedir=$(basename $dir)

    for file in $dir/*
    do
        filename=$(basename $file)
        extension="${filename##*.}"
        filename="${filename%.*}"

        echo "gs://spectros/$basedir/$filename.png, $basedir" >> $(pwd)/midi_$ver/output-labels.csv

        sox $file -c 1 -n remix 1-2 rate 16k spectrogram -r -h -o $(pwd)/midi_$ver/output/$basedir/$filename.png

    done
done
