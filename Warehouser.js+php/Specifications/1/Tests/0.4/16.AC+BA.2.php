<html>

	<head>

	<!-- Warehouser / Specification/1/Tests/1/TestClient.html - A simple Warehouser skeleton
	     YourMove Infrastructure (Boilerplate 0.1)
	     Published 27/01/2014
	     All rights reserved.                                                                   -->

		<style type="text/css"></style>
		<script type="text/javascript">

			console.log('YMI: Performing test - 14.AC+BM.0 - 1 complete read and write, repeated twice. Both as manual batches rather than using monitoring');
			console.log('YMI: Loading Warehouser.js');

		</script>
		<script type="text/javascript" src="../../../../0.4/Warehouser.js"></script>

		<script type="text/javascript">

			var Test = function () {

				if (typeof Warehouser !== 'undefined') {
				
					console.log('YMI: Warehouser loaded, running test 14.AC+BM.0..');

					Warehouser.Bundling.Limit = 2;
					Warehouser.Bundling.Window = 5;

					Warehouser.Daemon.Start();

					console.log('YMI: Part 1, Should wait until next 5 second window. Return 1-2 seconds after.. Part 2 at next 15 sec window');

					console.log('Queueing request..');
					Warehouser.Read('VectorPart', 2, 4);
					
					// Should wait until batch timeout then send

					setTimeout(function () {

						console.log('YMI: Part 2, Should wait until next 5 second window. Return 1-2 seconds after.. Part 3 at next 15 sec window');

						console.log('Queueing request..');
						Warehouser.Write({ Var1: 'Test Test' }, 'VectorPart', 2);

					}, 15000);

					setTimeout(function () {

						console.log('YMI: Part 3, Should run as soon as 2 jobs');

						console.log('Queueing 2 requests..');
						Warehouser.Read('VectorPart', 2, 4);
						Warehouser.Write({ Var1: 'Test Test' }, 'VectorPart', 2);

					}, 30000);
					
				}

				else {

					console.log('YMI: Warehouser not yet ready.. waiting..')
					return setTimeout(Test, 100);

				}

			}

			Test();

		</script>

	</head>

	<body>

		<script type="text/javascript">

			setTimeout("console.log('YMI: Test complete');", 50000);

		</script>

	</body>
</html>

