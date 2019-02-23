# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

[
  { text: "A new name for armpit hair:", format: :new_name },
  { text: "A celebrity you would like to eat, and the dish you'd eat them with:", format: :misc }
].each do |hash|
  Prompt.create(hash)
end
