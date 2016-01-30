class CreateGrids < ActiveRecord::Migration
  def change
    create_table :grids do |t|
      t.hstore :rows, default: {}
      t.index :id, unique: true
      t.timestamps null: false
    end
  end
end