 // Auto-generate tags from sections
        const tags = [];
        document.querySelectorAll("section").forEach(section => {
            let sectionTitle = section.querySelector("h2").textContent;
            let sectionId = section.id;
            tags.push({ name: sectionTitle, id: sectionId });
        });

        // Search Function
        function searchTags() {
            let query = document.getElementById("search-box").value.toLowerCase();
            let resultsContainer = document.getElementById("tag-results");
            resultsContainer.innerHTML = "";
            resultsContainer.style.display = query ? "block" : "none";

            let filteredTags = tags.filter(tag => tag.name.toLowerCase().includes(query));

            filteredTags.forEach(tag => {
                let li = document.createElement("li");
                li.textContent = tag.name;
                li.onclick = () => {
                    document.getElementById(tag.id).scrollIntoView({ behavior: "smooth" });
                    resultsContainer.style.display = "none"; // Hide results after selection
                };
                resultsContainer.appendChild(li);
            });
        }