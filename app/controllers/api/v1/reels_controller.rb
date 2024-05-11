class Api::V1::ReelsController < ApplicationController
  before_action :set_reel, only: %i[destroy]

  def index
    @show_reels = ShowReel.includes(:video_clips)
    render json: @show_reels.to_json(include: { video_clips: { only: [:id, :name, :start_time, :end_time] } }, methods: :calculate_total_duration)
  end

  def create
  end

  def destroy
    @reel&.destroy
    render json: { message: 'Reel deleted!' }
  end

  private

  def reel_params
    params.permit(:name, :video_standard, :video_definition, video_clips: [])
  end

  def set_reel
    @reel = ShowReel.find(params[:id])
  end
end
