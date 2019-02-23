# == Schema Information
#
# Table name: prompts
#
#  id              :uuid             not null, primary key
#  text            :string
#  format          :integer
#  for_all_players :boolean          default(FALSE)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Prompt < ApplicationRecord
  enum format: {
    misc: 0,
    new_name: 1
  }
end
