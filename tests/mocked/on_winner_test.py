'''test on_winner function in app.py'''
import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.dirname(os.path.abspath('../')))
from app import winner_test
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INITIAL_USERNAME = {'username': 'firstuser', 'rank': 102}

class OnWinnerTestCase(unittest.TestCase):
    '''test cases for on_winner'''
    print('in class')
    def setUp(self):
        '''defining success parameters'''
        playerX = models.Player(username='X', rank=100)
        playerO = models.Player(username='O', rank=100)
        self.user_ranks = [playerX.rank, playerO.rank]
        self.initial_db_users = [playerX, playerO]
        
        self.success_test_params = [
            {
                KEY_INPUT: {
                    'winner': playerX,
                    'loser': playerO
                },
                KEY_EXPECTED : [101, 99]
            },
            {
                KEY_INPUT: {
                    'winner': 'draw',
                    'loser': ''
                },
                KEY_EXPECTED : None
            },
            {
                KEY_INPUT: {
                    'winner': playerO,
                    'loser': playerX
                },
                KEY_EXPECTED : [100, 100]
            }
        ]
    
    def mocked_db_session_commit(self):
        '''mocking db.session.commit'''
        pass
    
    def test_on_winner(self):
        '''testing logic'''
        for test in self.success_test_params:
            with patch('app.DB.session.commit', self.mocked_db_session_commit):
    
                actual_result = winner_test(test[KEY_INPUT])
                print(actual_result)
                expected_result = test[KEY_EXPECTED]
                print(expected_result)
    
                self.assertEqual(actual_result, expected_result)
                self.assertEqual(type(actual_result), type(expected_result))

if __name__ == '__main__':
    unittest.main()
# def mocked_query_filter(self):
    #     '''mocking DB.session.query.filter'''
    #     for user in self.initial_db_users:
    #         if KEY_INPUT['winner'] == 'X':
    #             winner = playerX.username
    #             loser = playerO.username
    #         else:
    #             winner = playerO.username
    #             loser = playerX.username

# with patch('app.DB.session.query') as mocked_query:
                #     mocked_query.filter = self.mocked_query_filter