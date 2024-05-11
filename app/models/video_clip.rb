class VideoClip < ApplicationRecord
  belongs_to :show_reel

  validates :name, :description, :video_standard, :video_definition, :start_time, :end_time, presence: true
  validate :validate_video_standard_and_definition

  private

  def validate_video_standard_and_definition
    if show_reel && (video_standard != show_reel.video_standard || video_definition != show_reel.video_definition)
      errors.add(:base, "Video standard or definition does not match the show reel")
    end
  end
end
