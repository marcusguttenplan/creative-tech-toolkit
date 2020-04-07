require 'mail'
require 'csv'
require 'erb'

first = true
CSV.foreach("round_2.csv") do |row|
  if first
    first = false
  else
    @name = row[0].to_s
    @email = row[4].to_s
    @message = row[2].to_s
    @postmates = row[6].to_s
    @postmates_code = row[7].to_s
    @wine = row[8].to_s
    @wine_code = row[9].to_s
    @target = row[10].to_s
    @target_code = row[11].to_s
    @target_access = row[12].to_s

    puts @name, @email, @message, @postmates, @postmates_code, @wine, @wine_code, @target, @target_code

    template = ERB.new(File.read('template.html.erb')).result(binding)

    options = {
                # :address              => "smtp.mailgun.org",
                # :port                 => 587,
                # :user_name            => 'no-reply@impracticalapplications.com',
                # :password             => '<PW>'
                # :address              => "smtp.sendgrid.com",
                # :port                 => 465,
                # :user_name            => 'apikey',
                # :password             => '<PW>'
                :address                => 'smtp.gmail.com',
                :port                   => 587,
                :user_name              => 'fbgamedevelopersshowcase@wearesparks.com',
                :password               => '<PW>',
                :authentication         => 'plain',
                :enable_starttls_auto   => true
              }

    Mail.defaults do
      delivery_method :smtp, options
    end

    @mail = Mail.new(from: 'Facebook at GDC <fbgamedevelopersshowcase@wearesparks.com>', to: @email, subject: 'Thank You From Facebook at GDC')

    @mail.html_part do
      content_type 'text/html; charset=UTF-8'
      body template
    end

    puts "Sending mail!"
    @mail.deliver


  end
end
