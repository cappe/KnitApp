class WelcomeController < ApplicationController
  def index
  end

  def grid
    @grid = Grid.first
    render json: @grid.rows
  end

  def update
    @grid = Grid.first
    @grid.rows = params[:rows]
    if @grid.save
      flash[:notice] = 'Grid was saved successfully.'
    else
      flash[:error] = 'Something went wrong.'
    end
    respond_to do |format|
      format.js
    end
  end
end
