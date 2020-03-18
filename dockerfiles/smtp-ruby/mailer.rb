require 'mail'

options = { :address              => "smtp.gmail.com",
            :port                 => 587,
            :user_name            => '<email address>',
            :password             => '<password>',
            :authentication       => 'plain',
            :enable_starttls_auto => true  }

mail = Mail.new do
  from    '<email address>'
  to      '<email address>'
  subject 'Welcome'
  body    'Welcome to the Life of your Code'
end

Mail.defaults do
  delivery_method :smtp, options
end

puts "Sending mail!"
puts mail
puts mail.to

mail.to_s #=> "From: mikel@test.lindsaar.net\r\nTo: you@...
