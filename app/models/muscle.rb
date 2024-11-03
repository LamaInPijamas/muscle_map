class Muscle < ApplicationRecord
    has_many :exercises, dependent: :destroy
  
    validates :name, presence: true
    validates :description, presence: true
end