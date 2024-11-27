class ExercisesController < ApplicationController
  before_action :set_muscle, only: [:new, :create]

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
end