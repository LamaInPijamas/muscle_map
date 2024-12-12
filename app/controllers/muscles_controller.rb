# frozen_string_literal: true

class MusclesController < ApplicationController
  def index
    @muscles = Muscle.all
  end

  def show
    @muscle = Muscle.find(params[:id])
  end

  def new
    @muscle = Muscle.new
  end

  def create
    @muscle = Muscle.new(muscle_params)
    if @muscle.save
      redirect_to @muscle, notice: 'Muscle was successfully created.'
    else
      render :new
    end
  end

  def edit
    @muscle = Muscle.find(params[:id])
  end

  def update
    @muscle = Muscle.find(params[:id])
    if @muscle.update(muscle_params)
      redirect_to @muscle, notice: 'Muscle was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @muscle = Muscle.find(params[:id])
    @muscle.destroy
    redirect_to muscles_url, notice: 'Muscle was successfully destroyed.'
  end

  private

  def muscle_params
    params.require(:muscle).permit(:name, :description)
  end
end
