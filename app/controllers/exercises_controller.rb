# frozen_string_literal: true

class ExercisesController < ApplicationController
  before_action :set_muscle, only: %i[new create show edit update destroy]
  before_action :set_exercise, only: [:show, :edit, :update, :destroy]
  before_action :set_filters, only: [:filter]

  VALID_EXPERIENCE_LEVELS = ['Novice', 'Intermediate', 'Advanced'].freeze
  VALID_SETUP_TYPES = ['Bodyweight', 'Small Gym', 'Comercial Gym'].freeze


  def index
    Exercise.all
  end

  def show
    @exercise = Exercise.find(params[:id])
  end

  def new
    @muscle = Muscle.find(params[:muscle_id])
    @exercise = @muscle.exercises.build
  end

  def create
    @exercise = @muscle.exercises.build(exercise_params)
    if @exercise.save
      redirect_to root_path, notice: 'Exercise was successfully created.'
    else
      render :new
    end
  end

  def edit
    @muscle = Muscle.find(params[:muscle_id])
    @exercise = @muscle.exercises.find(params[:id])
  end

  def update
    @exercise = Exercise.find(params[:id])
    if @exercise.update(exercise_params)
      redirect_to root_path, notice: 'Exercise was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @exercise = Exercise.find(params[:id])
    @exercise.destroy
    redirect_to muscles_url, notice: 'Exercise was successfully destroyed.'
  end

  def filter
    @exercises = Exercise.all

    if params[:experience_level].present?
      @exercises = @exercises.where(experience_level: params[:experience_level])
    end

    if params[:setup_type].present?
      @exercises = @exercises.where(setup_type: params[:setup_type])
    end

    render partial: 'exercises_list', locals: { exercises: @exercises }
  end
  private

  def set_muscle
    @muscle = Muscle.find(params[:muscle_id])
  end

  def set_exercise
    @exercise = @muscle.exercises.find(params[:id])
  end

  def exercise_params
    params.require(:exercise).permit(:name, :description, :gif)
  end

  def set_filters
    @experience_level = validate_experience_level(params[:experience_level])
    @setup_type = validate_setup_type(params[:setup_type])
  end

  def validate_experience_level(level)
    VALID_EXPERIENCE_LEVELS.include?(level) ? level : 'Novice'
  end

  def validate_setup_type(type)
    VALID_SETUP_TYPES.include?(type) ? type : 'Bodyweight'
  end
end
