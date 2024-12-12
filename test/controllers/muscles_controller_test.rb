# frozen_string_literal: true

require 'test_helper'

class MusclesControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get muscles_index_url
    assert_response :success
  end

  test 'should get show' do
    get muscles_show_url
    assert_response :success
  end

  test 'should get new' do
    get muscles_new_url
    assert_response :success
  end

  test 'should get create' do
    get muscles_create_url
    assert_response :success
  end

  test 'should get edit' do
    get muscles_edit_url
    assert_response :success
  end

  test 'should get update' do
    get muscles_update_url
    assert_response :success
  end

  test 'should get destroy' do
    get muscles_destroy_url
    assert_response :success
  end
end
