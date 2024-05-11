class CreateVideoClips < ActiveRecord::Migration[7.0]
  def change
    create_table :video_clips do |t|
      t.string :name
      t.text :description
      t.string :video_standard
      t.string :video_definition
      t.string :start_time
      t.string :end_time
      t.references :show_reel, null: false, foreign_key: true

      t.timestamps
    end
  end
end
