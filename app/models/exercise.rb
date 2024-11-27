class Exercise < ApplicationRecord
  belongs_to :muscle
  has_one_attached :video
  has_one_attached :gif
  
  validates :name, presence: true
  validates :description, presence: true
  validates :gif, presence: true
end