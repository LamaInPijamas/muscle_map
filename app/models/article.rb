# frozen_string_literal: true

class Article < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true, length: { minimum: 10 }

  # for ransack cuz it needs to have searchable associations
  def self.ransackable_associations(_auth_object = nil)
    %w[articles]
  end

  # specify searchable attributes #a lot of them cuz gifs and videos atr.
  def self.ransackable_attributes(_auth_object = nil)
    %w[id title body]
  end
end
