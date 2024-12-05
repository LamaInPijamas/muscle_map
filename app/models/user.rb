class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, 
         :recoverable, :rememberable, :validatable

  # Specify searchable associations - ransack for active_model
  def self.ransackable_associations(auth_object = nil)
    %w[exercises]
  end

  # Specify searchable attributes - ransack for active_model
  def self.ransackable_attributes(auth_object = nil)
    %w[id email admin]
  end
end
