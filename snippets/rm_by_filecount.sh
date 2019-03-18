for i in `find . -maxdepth 1 -type d | grep "/"`
do
   cd $i;
   j=`echo \`ls -l | wc -l\` | bc`
   # [ $j -lt "200" ] && echo "Lesser than 100 files/directories in $i"
   [ $j -lt "200" ] && rm -rf
   cd ../
done
