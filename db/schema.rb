# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_15_160535) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "game_prompts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "game_id", null: false
    t.uuid "prompt_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_game_prompts_on_game_id"
    t.index ["prompt_id"], name: "index_game_prompts_on_prompt_id"
  end

  create_table "games", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "state"
    t.uuid "started_by_id"
    t.index ["started_by_id"], name: "index_games_on_started_by_id"
  end

  create_table "players", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "game_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false
    t.index ["game_id"], name: "index_players_on_game_id"
  end

  create_table "prompts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "text"
    t.integer "format"
    t.boolean "for_all_players", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "responses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "text"
    t.uuid "game_prompt_id", null: false
    t.uuid "player_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_prompt_id"], name: "index_responses_on_game_prompt_id"
    t.index ["player_id"], name: "index_responses_on_player_id"
  end

  create_table "votes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "game_prompt_id", null: false
    t.uuid "response_id"
    t.uuid "player_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_prompt_id"], name: "index_votes_on_game_prompt_id"
    t.index ["player_id"], name: "index_votes_on_player_id"
    t.index ["response_id"], name: "index_votes_on_response_id"
  end

  add_foreign_key "game_prompts", "games"
  add_foreign_key "game_prompts", "prompts"
  add_foreign_key "players", "games"
  add_foreign_key "responses", "game_prompts"
  add_foreign_key "responses", "players"
  add_foreign_key "votes", "game_prompts"
  add_foreign_key "votes", "players"
  add_foreign_key "votes", "responses"
end
