''' mocked database functions to test update_db and login function'''
import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.dirname(os.path.abspath('../')))
from app import update_db, on_winner
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INITIAL_USERNAME = {'username': 'firstuser', 'rank': 102}

class UpdateDBTableCase(unittest.TestCase):
    '''test cases for update_db'''
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: {'username': 'venkata', 'rank': 100},
                KEY_EXPECTED: ['firstuser', 'venkata'],
            },
        ]
        
        initial_player = models.Player(username=INITIAL_USERNAME['username'], rank=INITIAL_USERNAME['rank'])
        added_user = models.Player(username='venkata', rank=100)
        self.initial_db_mock_users = [added_user, initial_player] # [100, 102]
        # self.initial_db_mock_ranks = [added_user.rank, initial_player.rank] # ['venkata', 'firstuser']
    
    def mocked_player_query_order_by(self):
        self.initial_db_mock_users = self.initial_db_mock_users.sort(key=lambda x: x.rank, reverse=True)
        ordered_usernames=[]
        for user in self.initial_db_mock_users:
            ordered_usernames.append(user.username)
        return self.initial_db_mock_users
    
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.DB.session.query') as mocked_query:
                mocked_query.order_by.desc = self.mocked_player_query_order_by

                print(self.initial_db_mock_users)
                # print(self.initial_db_mock_ranks)
                actual_result = update_db(users=[], rankings=[])
                print(actual_result)
                print(self.initial_db_mock_users)
                # print(self.initial_db_mock_ranks)
                expected_result = test[KEY_EXPECTED]
                print(expected_result)
                
                self.assertEqual(actual_result, expected_result)
 
# class OnWinnerTestCase(unittest.TestCase):
#     '''test cases for on_winner'''
#     def setUp(self):
#         self.success_test_params = [
#             {
#                 KEY_INPUT: {
#                     ''
#                 }
#             }
#         ]
    

if __name__ == '__main__':
    unittest.main()