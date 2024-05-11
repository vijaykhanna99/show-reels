class CreateShowReels < ActiveRecord::Migration[7.0]
  def change
    create_table :show_reels do |t|
      t.string :name
      t.string :video_standard
      t.string :video_definition

      t.timestamps
    end
  end
end
