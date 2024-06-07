#Artfinder technical test
Got this task mostly done but started to go quite a bit over the time so ended it here.

###Considerations:

1. This uses `bun` package manager so will require `bun install` `bun run dev` commands running after cloning the repo.
2. The currency conversion service provided has CORS issues so I have made use of the cors-anywhere reverse proxy. The rates won't load initially so I have added a button which will link you to the cors-anywhere page. Please click the "temporarily allow access" button on this page to get access to the EURO conversion rates endpoint. Normally we would have a separate backend to handle this but I felt this would be sufficient for the purpose of the tech task.
3. Ignore the commit times, it has been manic preparing for the birthday party on Saturday so I slotted in time where I could. The "conversion logic mostly working" commit took approx 1.5 - 2hours
