class Exercise < ApplicationRecord
  belongs_to :muscle
  has_one_attached :video

  validates :name, presence: true
  validates :description, presence: true
  validates :video, presence: true
end