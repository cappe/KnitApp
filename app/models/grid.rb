class Grid < ActiveRecord::Base
  serialize :rows, ActiveRecord::Coders::NestedHstore
  before_create :init_cells

  private

    def init_cells
      rows = {}
      cell_id = 0
      2.times do |row|
        cells = {}
        2.times do |cell|
          cells[cell] = {:cell_id => cell_id, :symbol => :square}
          cell_id += 1
        end
        rows[row] = cells
      end
      self.rows = rows
    end

end
