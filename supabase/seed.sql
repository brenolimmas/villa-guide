-- ================================================================
-- Seed: Villa Mariz — dados migrados do index.html
-- Execute após 001_initial.sql
-- ================================================================

-- 1. Host
INSERT INTO hosts (id, email, name, whatsapp)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'breno.lima@estat.com.br',
  'Breno Lima',
  '5573991547018'
);

-- 2. Property
INSERT INTO properties (
  id, host_id, slug, name, subtitle,
  hero_image, hero_badge_image, location,
  wifi_name, wifi_pass, safe_code,
  checkin_time, checkout_time,
  whatsapp, lat, lon
)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'villa-mariz',
  'Villa Mariz',
  'Hospedagem com Amor',
  '/assets/villa-mariz-property.png',
  '/assets/villa-mariz-hero.jpeg',
  'Porto Seguro — Bahia',
  'ANDERSON_EXT',
  '1357924680',
  NULL,
  '15:00',
  '11:00',
  '5573991547018',
  -16.47,
  -39.07
);

-- 3. Active reservation
INSERT INTO reservations (property_id, guest_name, checkin_date, checkout_date, guests_count, active)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'Breno Lima',
  '2026-06-14',
  '2026-06-18',
  2,
  true
);

-- 4. House rules
INSERT INTO house_rules (property_id, category, title, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000002', 'info',     'Manter <strong>portas e janelas fechadas após 16h</strong> para evitar mosquitos', 1),
  ('00000000-0000-0000-0000-000000000002', 'warning',  'Ao sair, <strong>desligue luzes, TV e ar condicionado</strong>', 2),
  ('00000000-0000-0000-0000-000000000002', 'info',     'Respeite o <strong>espaço privado</strong> de outros apartamentos', 3),
  ('00000000-0000-0000-0000-000000000002', 'critical', '<strong>Não fumar</strong> no interior do apartamento', 4),
  ('00000000-0000-0000-0000-000000000002', 'warning',  'Não colocar <strong>objetos molhados</strong> sobre móveis', 5),
  ('00000000-0000-0000-0000-000000000002', 'info',     'Na Netflix, utilize sempre o perfil <strong>''Hóspede''</strong>', 6),
  ('00000000-0000-0000-0000-000000000002', 'critical', 'Objetos <strong>danificados, perdidos ou manchados</strong> devem ser ressarcidos', 7),
  ('00000000-0000-0000-0000-000000000002', 'info',     'Cuidado com <strong>produtos na pele</strong> — evite manchas em toalhas e lençóis', 8);

-- 5. FAQs
INSERT INTO faqs (id, property_id, question, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000002', 'Como usar o ar-condicionado', 1),
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000002', 'Como usar nosso fogão', 2),
  ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000002', 'Como acessar aplicativos na TV', 3);

INSERT INTO faq_steps (faq_id, step_text, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000010', 'O controle fica na <strong>gaveta da mesa de cabeceira</strong>', 1),
  ('00000000-0000-0000-0000-000000000010', 'Pressione o botão <strong>Power</strong> para ligar', 2),
  ('00000000-0000-0000-0000-000000000010', 'Use as setas <strong>▲▼</strong> para ajustar a temperatura', 3),
  ('00000000-0000-0000-0000-000000000010', 'Recomendamos manter entre <strong>22 °C e 24 °C</strong>', 4),
  ('00000000-0000-0000-0000-000000000010', 'Ao sair, <strong>desligue sempre</strong> o ar-condicionado', 5),
  ('00000000-0000-0000-0000-000000000011', 'Gire o botão do queimador desejado para a posição de <strong>ignição</strong>', 1),
  ('00000000-0000-0000-0000-000000000011', 'Pressione e gire simultaneamente — a chama <strong>acende automaticamente</strong>', 2),
  ('00000000-0000-0000-0000-000000000011', 'Ajuste a intensidade pela posição do botão', 3),
  ('00000000-0000-0000-0000-000000000011', 'Ao terminar, gire de volta para a posição <strong>"0"</strong>', 4),
  ('00000000-0000-0000-0000-000000000012', 'Ligue a TV com o <strong>controle remoto preto</strong>', 1),
  ('00000000-0000-0000-0000-000000000012', 'Pressione o botão <strong>Home</strong> (ícone de casinha) para ir à tela inicial', 2),
  ('00000000-0000-0000-0000-000000000012', 'Selecione o app desejado — Netflix, Prime Video, YouTube e outros estão disponíveis', 3),
  ('00000000-0000-0000-0000-000000000012', 'Na Netflix, use sempre o perfil <strong>"Hóspede"</strong> — não altere outros perfis', 4);

-- 6. Villa slides
INSERT INTO villa_slides (property_id, image_url, caption_title, caption_desc, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000002', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1236275823103098741/original/8d2847d9-bd15-4645-922d-b0f8d86f46e0.jpeg?im_w=1440', 'Fim de tarde', 'O pôr do sol aqui é um espetáculo à parte.', 1),
  ('00000000-0000-0000-0000-000000000002', '/assets/villa-mariz-property.png', 'Área gourmet', 'Um espaço pensado para reunir e celebrar.', 2),
  ('00000000-0000-0000-0000-000000000002', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1236275823103098741/original/161e1593-44ce-4f7f-a6dd-e094fb356154.jpeg?im_w=1440', 'Noite tranquila', 'Silêncio, brisa e o céu repleto de estrelas.', 3);

-- 7. Commerce places
INSERT INTO commerce_places (id, property_id, category, name, image_url, maps_url, drive_minutes, walk_minutes, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000002', 'supermarkets', 'Big Stop',
   'https://lh3.googleusercontent.com/gps-cs-s/APNQkAF8gJnivr3K5N8Ev6CHoJFsHpJ3Zk185fXu-NnPXHhLtr2KKTR7EYVvUtLxYcqq9-83TpIgDW9czmHHZHKWQVlACUyBexM9LTQmDqLn1mOd5NR-VaMxX6kEIAAaRQaBzpqoDgDe=s680-w680-h510-rw',
   'https://maps.app.goo.gl/7Je98Urh5iqbcuMn6', 3, 15, 1),
  ('00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000002', 'supermarkets', 'Frossard',
   'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHq_Ql86qh-1QEEByqOxRnniqjtFjXVKaCVSE6jr836VMIYUn_wUas6HTXmAALaarcEXNmdb_F70zULtMUuuXGGrcQ0UNazRrp-lXpqk45Oa0vKrYPlhRADnLYn3iRXHidoZL4Cww=w289-h312-n-k-no',
   'https://maps.app.goo.gl/5JLWL1XYCMPTW5D37', 5, 25, 2);

INSERT INTO commerce_hours (place_id, day_label, hours, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000020', 'Segunda-feira',  '07:00 – 21:30', 1),
  ('00000000-0000-0000-0000-000000000020', 'Terça-feira',    '07:00 – 21:30', 2),
  ('00000000-0000-0000-0000-000000000020', 'Quarta-feira',   '07:00 – 21:30', 3),
  ('00000000-0000-0000-0000-000000000020', 'Quinta-feira',   '07:00 – 21:30', 4),
  ('00000000-0000-0000-0000-000000000020', 'Sexta-feira',    '07:00 – 21:30', 5),
  ('00000000-0000-0000-0000-000000000020', 'Sábado',         '07:00 – 21:30', 6),
  ('00000000-0000-0000-0000-000000000020', 'Domingo',        'Fechado',        7),
  ('00000000-0000-0000-0000-000000000021', 'Segunda-feira',  '07:00 – 21:30', 1),
  ('00000000-0000-0000-0000-000000000021', 'Terça-feira',    '07:00 – 21:30', 2),
  ('00000000-0000-0000-0000-000000000021', 'Quarta-feira',   '07:00 – 21:30', 3),
  ('00000000-0000-0000-0000-000000000021', 'Quinta-feira',   '07:00 – 21:30', 4),
  ('00000000-0000-0000-0000-000000000021', 'Sexta-feira',    '07:00 – 21:30', 5),
  ('00000000-0000-0000-0000-000000000021', 'Sábado',         '07:00 – 21:30', 6),
  ('00000000-0000-0000-0000-000000000021', 'Domingo',        'Fechado',        7);

-- 8. Routes
INSERT INTO routes (property_id, title, image_url, distance_km, description, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000002',
   'Passarela do Descobrimento',
   'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/da/26/4f/musica-ao-vivo-com-culinaria.jpg?w=1400&h=-1&s=1',
   9.5,
   'A Passarela do Descobrimento é um dos principais pontos turísticos de Porto Seguro, famosa por sua vida noturna, bares, restaurantes e lojas de artesanato.',
   1),
  ('00000000-0000-0000-0000-000000000002',
   'Rua do Mucugê - Arraial d''Ajuda',
   'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/dd/45/da/rua-do-mucuge.jpg?w=1000&h=-1&s=1',
   16.2,
   'A Rua Mais Charmosa Do Brasil — pousadas, restaurantes e bares com música ao vivo, sorveterias artesanais e dezenas de lojas.',
   2);

-- 9. Emergency contacts
INSERT INTO emergency_contacts (property_id, label, sub_label, phone, is_primary, sort_order) VALUES
  ('00000000-0000-0000-0000-000000000002', 'SAMU',            'Serviço de Ambulância',  '192',          false, 1),
  ('00000000-0000-0000-0000-000000000002', 'Polícia Militar', 'Emergência policial',     '190',          false, 2),
  ('00000000-0000-0000-0000-000000000002', 'Bombeiros',       'Incêndio e resgate',      '193',          false, 3),
  ('00000000-0000-0000-0000-000000000002', 'Condomínio',      'Emergência local',        '73999999999',  false, 4);
