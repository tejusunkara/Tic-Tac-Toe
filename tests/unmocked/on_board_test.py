'''tests board function in app.py'''
import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.dirname(os.path.abspath('../')))
from app import board

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

class OnBoardTestCase(unittest.TestCase):
    '''test cases for testing on_board'''
    def setUp(self):
        '''defining success parameters'''
        self.success_test_params = [
            {
                KEY_INPUT: {
                    'updateBoard': ['X', None, 'O', 'X', 'O', None, 'X', None, None],
                    'cell': 6,
                    'xPlaysNext': False,
                    'gameOver': True,
                    'winnerMessage': 'Winner is X!',
                },
                
                KEY_EXPECTED: {
                    'cell': 6, 
                }
            },
            
            {
                KEY_INPUT: {
                    'updateBoard': ['X', None, None, None, None, None, None, None, None],
                    'cell': 0,
                    'xPlaysNext': False,
                    'gameOver': False,
                    'winnerMessage': ''
                },
                KEY_EXPECTED: {
                    'cell': 0, 
                }
            },
            
            {
                KEY_INPUT: {
                    'updateBoard': [None, 'X', None, None, 'O', None, None, None, None],
                    'cell': 4,
                    'xPlaysNext': True,
                    'gameOver': False,
                    'winnerMessage': '',
                },
                KEY_EXPECTED: {
                    'cell': 4, 
                }
            }
        ]
        
    def test_on_board(self):
        '''testing logic'''
        for test in self.success_test_params:
            print(test[KEY_INPUT])
            actual_result = board(test[KEY_INPUT])
            print(actual_result)
            expected_result = test[KEY_EXPECTED]
            print(expected_result)
            
            self.assertEqual(actual_result['cell'], expected_result['cell'])
            self.assertEqual(len(actual_result), len(expected_result))


if __name__ == '__main__':
    unittest.main()