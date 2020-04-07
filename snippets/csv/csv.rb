require 'csv'

first = true
CSV.foreach("round_2.csv") do |row|
  if first
    first = false
  else
    @name = row[0].to_s
    @email = row[4].to_s
    @message = row[2].to_s
  end
end
