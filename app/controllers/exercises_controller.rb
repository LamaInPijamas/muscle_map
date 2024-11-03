class ExercisesController < ApplicationController
  def show
    @exercise = Exercise.find(params[:id])
  end

  def new
    @muscle = Muscle.find(params[:muscle_id])
    @exercise = @muscle.exercises.build
  end

  def create
    @muscle = Muscle.find(params[:muscle_id])
    @exercise = @muscle.exercises.build(exercise_params)
    if @exercise.save
      redirect_to @exercise, notice: 'Exercise was successfully created.'
    else
      render :new
    end
  end

  def edit
    @exercise = Exercise.find(params[:id])
  end

  def update
    @exercise = Exercise.find(params[:id])
    if @exercise.update(exercise_params)
      redirect_to @exercise, notice: 'Exercise was successfully updated.'
    else
      render :edit
  end
  
  def destroy
    @exercise = Exercise.find(params[:id])
    @exercise.destroy
    redirect_to muscle_path(@exercise.muscle), notice: 'Exercise was successfully destroyed.'
  end

  private

  def exercise_params
    params.require(:exercise).permit(:name, :description, :video)
  end
end