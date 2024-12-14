# frozen_string_literal: true

class ExercisesController < ApplicationController
  before_action :set_muscle, only: %i[new create]
  before_action :set_exercise, only: [:show, :edit, :update, :destroy]
  before_action :set_filters, only: [:filter]

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
    @experience_level = params[:experience_level]
    @setup_type = params[:setup_type]

    @exercises = Exercise.where(experience_level: @experience_level, setup_type: @setup_type)

    respond_to do |format|
      format.html # in case handling non-AJAX requests
      format.js
    end
    render partial: 'exercises_list', locals: { exercises: @exercises }# for some magic reason, this line is needed to render the partial. Simple render does not work, it does not see the partial where it clearly is and needs to be.
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
    @experience_level = params[:experience_level]
    @setup_type = params[:setup_type]
  end
end
