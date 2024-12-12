# frozen_string_literal: true

class Exercise < ApplicationRecord
  belongs_to :muscle
  has_one_attached :video
  has_one_attached :gif

  validates :name, presence: true
  validates :description, presence: true
  validates :gif, presence: true
  # for ransack cuz it needs to have searchable associations
  def self.ransackable_associations(_auth_object = nil)
    %w[exercises]
  end

  # specify searchable attributes #a lot of them cuz gifs and videos atr.
  def self.ransackable_attributes(_auth_object = nil)
    %w[id muscle_id_eq video_attachment_id_eq video_blob_id_eq gif_attachment_id_eq gif_blob_id_eq name description]
  end
end
