'''tests on_board socetio in app.py'''
import os
import sys
import unittest
import unittest.mock as mock
from unittest.mock import patch

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.dirname(os.path.abspath('../')))
from app import SOCKETIO, APP, on_board
# pylint: disable=no-member, too-few-public-methods, wrong-import-position, invalid-envvar-default, global-statement

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

class OnBoardSocketTest(unittest.TestCase):
    '''performs unit test and provides parameters'''
    def setUp(self):
        '''defining success parameters'''
        self.success_test_params = [
            {
                KEY_INPUT: {
                    'updateBoard': ['X', None, 'O', None, 'X', 'O', None, None, None],
                    'cell': 5,
                    'xPlaysNext': True,
                    'gameOver': False,
                    'winnerMessage': '',
                },
                KEY_EXPECTED: {
                    'updateBoard': ['X', None, 'O', None, 'X', 'O', None, None, None],
                    'cell': 5,
                    'xPlaysNext': True,
                    'gameOver': False,
                    'winnerMessage': '',
                }
            },

            {
                KEY_INPUT: {
                    'updateBoard': ['X', None, 'O', None, 'X', 'O', None, None, 'X'],
                    'cell': 8,
                    'xPlaysNext': False,
                    'gameOver': True,
                    'winnerMessage': 'Winner is X!',
                },
                KEY_EXPECTED: {
                    'updateBoard': ['X', None, 'O', None, 'X', 'O', None, None, 'X'],
                    'cell': 8,
                    'xPlaysNext': False,
                    'gameOver': True,
                    'winnerMessage': 'Winner is X!',
                }
            },

            {
                KEY_INPUT: {
                    'updateBoard': ['X', 'X', 'O', 'X', 'O', 'O', None, 'X', 'O'],
                    'cell': 8,
                    'xPlaysNext': True,
                    'gameOver': True,
                    'winnerMessage': 'Winner is O!',
                },
                KEY_EXPECTED: {
                    'updateBoard': ['X', 'X', 'O', 'X', 'O', 'O', None, 'X', 'O'],
                    'cell': 8,
                    'xPlaysNext': True,
                    'gameOver': True,
                    'winnerMessage': 'Winner is O!',
                }
            }
        ]

    def test_on_socket(self):
        '''testing logic'''
        for test in self.success_test_params:
            # log the user in through Flask test client
            flask_test_client = APP.test_client()

            # connect to Socket.IO without being logged in
            socketio_test_client = SOCKETIO.test_client(
                APP, flask_test_client=flask_test_client)

            actual_result = flask_test_client.post('/', data=test[KEY_INPUT])
            print(actual_result.status_code)
            self.assertEqual(actual_result.status_code, 200)

            # connect to Socket.IO again, but now as a logged in user
            socketio_test_client = SOCKETIO.test_client(
                APP, flask_test_client=flask_test_client)

            # make sure the server accepted the connection
            actual_result = socketio_test_client.get_received()
            print('actual result: '+str(actual_result))
            self.assertEqual(len(actual_result), 5)
            self.assertEqual(actual_result[0]['name'], 'board')
            self.assertEqual(len(actual_result[0]['args']), 5)

            expected_result = test[KEY_EXPECTED]
            print('expected: '+str(expected_result))

            self.assertEqual(actual_result, expected_result)
            self.assertEqual(actual_result[0]['args'][0], expected_result[0]['args'][0])

if __name__ == '__main__':
    unittest.main()
