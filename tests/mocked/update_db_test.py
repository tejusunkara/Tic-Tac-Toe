''' mocked database functions to test update_db and login function'''
import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.dirname(os.path.abspath('../')))
from app import update_test
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INITIAL_USERNAME = {'username': 'firstuser', 'rank': 102}
user1 = {'username': 'user1', 'rank': 99}
user2 = {'username': 'user2', 'rank': 105}

class UpdateDBTableCase(unittest.TestCase):
    '''test cases for update_db'''
    def setUp(self):
        '''defining success parameters'''
        self.success_test_params = [
            {
                KEY_INPUT: {
                    'username': 'venkata', 
                    'rank': 100
                },
                KEY_EXPECTED: ['firstuser', 'venkata'],
            },
            {
                KEY_INPUT: user1,
                KEY_EXPECTED: ['firstuser', 'venkata', 'user1'],
            },
            {
                KEY_INPUT: user2,
                KEY_EXPECTED: ['user2', 'firstuser', 'venkata', 'user1'],
            }
        ]
        
        initial_player = models.Player(username=INITIAL_USERNAME['username'], rank=INITIAL_USERNAME['rank'])
        # added_user = models.Player(username='venkata', rank=100)
        self.initial_db_mock_users = [initial_player]
        
    def mocked_order_by_desc(self):
        '''mocked query.order_by(.desc())'''
        self.initial_db_mock_users.sort(key=lambda x: x.rank, reverse=True)
        ordered_usernames=[]
        for user in self.initial_db_mock_users:
            ordered_usernames.append(user.username)
        return self.mocked_query_order_by(ordered_usernames)
    
    def mocked_query_order_by(self, users):
        '''mocked query.order_by()'''
        return users
    
    def test_success(self):
        '''testing logic'''
        for test in self.success_test_params:
            with patch('models.Player.query') as mocked_query:
                mocked_query.order_by = self.mocked_query_order_by
                with patch('models.Player.rank') as mocked_order_by:
                    mocked_order_by.desc = self.mocked_order_by_desc

                    user = models.Player(username=test[KEY_INPUT]['username'], rank=test[KEY_INPUT]['rank'])
                    self.initial_db_mock_users.append(user)
                    print(self.initial_db_mock_users)
                    print(self.initial_db_mock_users)

                    actual_result = update_test()
                    print(actual_result)

                    expected_result = test[KEY_EXPECTED]
                    print(expected_result)

                    self.assertEqual(actual_result, expected_result)
                    self.assertEqual(len(actual_result), len(expected_result))
    

if __name__ == '__main__':
    unittest.main()