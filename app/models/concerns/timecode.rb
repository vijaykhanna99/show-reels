module Timecode
  FRAME_RATE_PAL = 25
  FRAME_RATE_NTSC = 30

  def self.calculate_duration(start_timecode, end_timecode, video_standard)
    start_frame = parse_timecode(start_timecode)
    end_frame = parse_timecode(end_timecode)
    frame_rate = video_standard == 'PAL' ? FRAME_RATE_PAL : FRAME_RATE_NTSC

    (end_frame - start_frame) / frame_rate.to_f
  end

  def self.format_duration(total_duration, video_standard)
    frame_rate = video_standard == 'PAL' ? FRAME_RATE_PAL : FRAME_RATE_NTSC
    hours = total_duration / 3600
    minutes = (total_duration % 3600) / 60
    seconds = total_duration % 60
    frames = ((total_duration - total_duration.to_i) * frame_rate).round

    "#{hours.to_s.rjust(2, '0')}:#{minutes.to_s.rjust(2, '0')}:#{seconds.to_s.rjust(2, '0')}:#{frames.to_s.rjust(2, '0')}"
  end

  private

  def self.parse_timecode(timecode)
    hours, minutes, seconds, frames = timecode.split(':').map(&:to_i)
    frames + (seconds + (minutes + hours * 60) * 60) * FRAME_RATE_PAL
  end
end
