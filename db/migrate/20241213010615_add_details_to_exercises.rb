class AddDetailsToExercises < ActiveRecord::Migration[7.1]
  def change
    add_column :exercises, :gender, :string
    add_column :exercises, :experience_level, :string
    add_column :exercises, :setup_type, :string
  end
end
