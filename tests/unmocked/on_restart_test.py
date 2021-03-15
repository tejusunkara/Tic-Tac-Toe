import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.dirname(os.path.abspath('../')))
from app import restart

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

class OnRestartTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: {
                    'updateBoard': [None, None, None, None, None, None, None, None, None],
                    'cell': None,
                    'xPlaysNext': False,
                    'gameOver': True,
                    'winnerMessage': 'Winner is X!',
                },
                
                KEY_EXPECTED: {
                    'updateBoard': [None, None, None, None, None, None, None, None, None],
                    'cell': None
                }
            },
            
            {
                KEY_INPUT: {
                    'updateBoard': ['X', None, None, None, None, None, None, None, None],
                    'cell': None,
                    'xPlaysNext': False,
                    'gameOver': False,
                    'winnerMessage': ''
                },
                KEY_EXPECTED: { 
                    'cell': None
                }
            },
            
            {
                KEY_INPUT: {
                    'updateBoard': [None, None, None, None, None, None, None, None, None],
                    'cell': 4,
                    'xPlaysNext': True,
                    'gameOver': False,
                    'winnerMessage': '',
                },
                KEY_EXPECTED: {
                    'updateBoard': [None, None, None, None, None, None, None, None, None],
                }
            }
        ]
        
    def test_on_restart(self):
        for test in self.success_test_params:
            
            actual_result = restart(test[KEY_INPUT])
            print(actual_result)
            expected_result = test[KEY_EXPECTED]
            print(expected_result)
            
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(len(actual_result), len(expected_result))


if __name__ == '__main__':
    unittest.main()