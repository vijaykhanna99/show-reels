class ShowReel < ApplicationRecord
  has_many :video_clips
  validates :name, presence: true

  def total_duration
    total_duration_cal = 0
    self.video_clips.each do |clip|
      total_duration_cal += Timecode.calculate_duration(clip.start_time, clip.end_time, self.video_standard)
    end
    self.total_duration = Timecode.format_duration(total_duration_cal, self.video_standard)
  end
end
