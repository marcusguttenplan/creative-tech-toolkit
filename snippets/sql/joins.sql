SELECT r.id, r.first_name, r.last_name, r.email, r.bio, s.title, s.url FROM registrants as r INNER JOIN registrant_session rs ON rs.registrant_id=r.id INNER JOIN sessions s ON s.id=rs.session_id GROUP BY s.title, r.id;

SELECT p.id, p.question, p.answers, p.users, p.channel_id, p.demo_id, p.sponsor_id, c.title, s.title, d.title FROM polls as p INNER JOIN channels c ON c.id=p.channel_id INNER JOIN sponsors s ON s.id=p.sponsor_id INNER JOIN demos d ON d.id=p.demo_id;

SELECT p.id, p.question, p.answers, p.users, p.channel_id, p.demo_id, p.sponsor_id, c.title FROM polls as p INNER JOIN channels c ON c.id=p.channel_id;

SELECT p.id, p.question, p.answers, p.users, p.channel_id, p.demo_id, p.sponsor_id, s.title, FROM polls as p INNER JOIN sponsors s ON s.id=p.sponsor_id;

SELECT p.id, p.question, p.answers, p.users, p.channel_id, p.demo_id, p.sponsor_id, d.title FROM polls as p INNER JOIN demos d ON d.id=p.demo_id;
