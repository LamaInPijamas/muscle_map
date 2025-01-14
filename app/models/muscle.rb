# frozen_string_literal: true

class Muscle < ApplicationRecord
  has_many :exercises, dependent: :destroy

  validates :name, presence: true
  validates :description, presence: true

  # for ransack cuz it needs to have searchable associations
  def self.ransackable_associations(_auth_object = nil)
    %w[exercises]
  end

  # specify searchable attributes
  def self.ransackable_attributes(_auth_object = nil)
    %w[id name description]
  end
end
