# frozen_string_literal: true

class CreateMuscles < ActiveRecord::Migration[7.1]
  def change
    create_table :muscles do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
