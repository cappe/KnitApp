class WelcomeController < ApplicationController
  def index
  end

  def grid
    @grid = Grid.first
    render json: @grid.rows
  end
end
