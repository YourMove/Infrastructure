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
				
					console.log('YMI: Warehouser loaded, running test 14.AC+BM.0 - Part 1..');

					Warehouser.Bundling.Limit = 2;
					Warehouser.Bundling.Window = 5;
					console.log(Warehouser.Daemon.Start());

					console.log(Warehouser.Read('VectorPart', 2, 4));
					// Should wait until batch timeout

					setTimeout("console.log(Warehouser.Write({ Var1: 'Test Test' }, 'VectorPart', 2));", 10000);
					// Should auto send batch now
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

			setTimeout("console.log('YMI: Test complete');", 20000);

		</script>

	</body>
</html>

