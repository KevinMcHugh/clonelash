# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

[
  { text: "A new name for armpit hair:", format: :new_name },
  { text: "A celebrity you would like to eat, and the dish you'd eat them with:", format: :misc },
  { text: 'What two words would passengers never want to hear a pilot say?', format: :misc},
  { text: 'You would never go on a roller coaster called "BLANK"', format: :fill_in_the_blank},
  { text: 'The secret to a happy life', format: :misc},
  { text: 'If a winning coach gets Gatorade dumped on his head, what should get dumped on the losing coach?', format: :misc},
  { text: 'Everyone knows that monkeys hate "BLANK"', format: :fill_in_the_blank},
  { text: 'The biggest downside to living in Hell': format: :misc},
  { text: "Jesus's REAL last words", format: :quote}
].each do |hash|
  Prompt.create(hash)
end
